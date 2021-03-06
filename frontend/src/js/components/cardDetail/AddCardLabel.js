import React from "react";

import { requestCardUpdate } from "../../apis/apiRequests";
import CardLabelColors from "../shared/CardLabelColors";
import DropdownButton from "../shared/DropdownButton";
import { useCardDetailContext, useBoardContext } from "../../utils/hookUtils";

const AddCardLabel = () => {
  const { card, id, sourceId } = useCardDetailContext();
  const { updateBoardState } = useBoardContext();

  const { labels } = card;

  const handleColorClick = async (color) => {
    if (labels.includes(color)) {
      card.labels.splice(labels.indexOf(color), 1);
    } else {
      card.labels.push(color);
    }

    const body = { newCard: card, listId: sourceId };
    await requestCardUpdate(body, id).then((res) => updateBoardState(res.data));
  };

  return (
    <DropdownButton icon="tags" buttonText="Labels" header="Labels">
      <CardLabelColors
        labels={card.labels}
        handleColorClick={handleColorClick}
      />
    </DropdownButton>
  );
};

export default AddCardLabel;
