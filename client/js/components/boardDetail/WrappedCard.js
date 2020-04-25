import React, { memo, useState } from "react";

import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";

import { Types } from "../../constants/constants";
import CardItem from "./CardItem";

const WrappedCard = ({
  card,
  connectDragSource,
  connectDropTarget,
  isDragging,
  isOverCard,
  sourceListId,
  listTitle,
  isLast,
}) => {
  const [showEditButton, setShowEditButton] = useState(false);

  const styles = {
    backgroundColor: !isDragging && "#fff",
    borderRadius: "2px",
    boxShadow: !isDragging && "#0f1e4259",
    display: isDragging && isOverCard && "none",
    marginTop: "7px",
    minHeight: "20px",
    position: "relative",
    visibility: isDragging && "hidden",
    zIndex: 0,
  };

  const wrappedCardItem = (
    <div
      style={styles}
      onMouseEnter={() => setShowEditButton(true)}
      onMouseLeave={() => setShowEditButton(false)}
    >
      <CardItem
        card={card}
        sourceListId={sourceListId}
        sourceTitle={listTitle}
        isLast={isLast}
        showEditButton={showEditButton}
      />
    </div>
  );

  return connectDragSource(connectDropTarget(wrappedCardItem));
};

const source = {
  beginDrag(props) {
    const { card, sourceListId } = props;
    props.handleStartDrag(sourceListId, card.position);

    return {};
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) return;

    return props.handleDrop();
  },
};

const target = {
  hover(props, monitor) {
    const { card, sourceId } = props;

    if (!monitor.isOver({ shallow: false })) return;

    return props.updateDropTargetId(sourceId, card.position);
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const cardCollect = (connect, monitor) => ({
  isOverCard: monitor.isOver({ shallow: true }),
  connectDropTarget: connect.dropTarget(),
});

export default flow(
  DragSource(Types.LIST, source, collect),
  DropTarget(Types.LIST, target, cardCollect)
)(memo(WrappedCard));