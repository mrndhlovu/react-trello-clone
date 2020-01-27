import React from "react";
import styled from "styled-components";

import { DropTarget } from "react-dnd";

import { Header, Segment } from "semantic-ui-react";
import CreateCard from "./CreateCard";
import CardItemWrapper from "./CardItemWrapper";
import { Types } from "../constants/constants";

const StyledSegment = styled(Segment)`
  max-width: 300px;
  min-height: 100px;
  background-color: #ebecf0 !important;
  margin-right: 10px !important;
`;

const StyledHeaderHeader = styled(Header)`
  padding-top: 5px !important;
`;

const StyledNewCardDropZone = styled.div`
  background-color: #c4c4c4 !important;
  margin: 10px 10px !important;
  min-height: 25px;
  position: relative;
  text-decoration: none;
  z-index: 0;
  padding: 5px 0px 3px 10px;
  border-radius: 5px;
`;

const Column = ({
  activeColumn,
  column,
  columnHasCards,
  connectDropTarget,
  dropColumnId,
  isOverCurrent,
  sourceId,
  updateDropTarget,
  isOver,
  ...rest
}) => {
  const { name, id, cards } = column;

  if (isOverCurrent) {
    updateDropTarget(id);
  }

  const styles = {
    display: "inline-block",
    verticalAlign: "top",
    boxSizing: "border-box"
  };

  const wrappedColumn = (
    <div style={styles} id={`column-${id}`}>
      <StyledSegment>
        <StyledHeaderHeader size="tiny">{name}</StyledHeaderHeader>

        <CardItemWrapper
          cards={cards}
          column={column}
          dropColumnId={dropColumnId ? dropColumnId : id}
          isOver={isOver}
          isOverCurrent={isOverCurrent}
          sourceId={sourceId ? sourceId : id}
          {...rest}
        />

        {isOverCurrent && <StyledNewCardDropZone />}
        <CreateCard
          cards={cards}
          columnId={id}
          activeColumn={activeColumn === id}
          {...rest}
        />
      </StyledSegment>
    </div>
  );

  return connectDropTarget(wrappedColumn);
};

const target = {
  drop(props) {
    return props.handleDrag(props.dropColumnId);
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({ shallow: true })
});

export default DropTarget(Types.COLUMN, target, collect)(Column);