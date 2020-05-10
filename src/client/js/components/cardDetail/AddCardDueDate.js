import React, { useState, useEffect, lazy, Suspense } from "react";

import DropdownButton from "../sharedComponents/DropdownButton";

const PickDueDate = lazy(() => import("../sharedComponents/PickDueDate"));

const AddCardDueDate = ({
  activeCard,
  board,
  sourceId,
  handleBoardUpdate,
  getSourceList,
  saveCardChanges,
  color,
}) => {
  const [dueDate, setDueDate] = useState(false);
  const [removeDueDate, setRemoveDueDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const sourceList = getSourceList(sourceId, "_id");

  const handleAddClick = () => setDueDate(true);
  const handleRemoveClick = () => setRemoveDueDate(true);

  useEffect(() => {
    let newCard;

    if (removeDueDate) {
      newCard = {
        ...activeCard,
        dueDate: "",
      };
    }

    if (dueDate) {
      newCard = {
        ...activeCard,
        dueDate: { date: `${startDate}`, complete: false },
      };
    }

    if (removeDueDate || dueDate) {
      saveCardChanges(newCard);
      sourceList.cards.splice(sourceList.cards.indexOf(activeCard), 1, newCard);
      board.lists.splice(board.lists.indexOf(sourceList), 1, sourceList);

      handleBoardUpdate(board, "lists", "dueDate");
    }

    return () => {
      setDueDate(false);
      setRemoveDueDate(false);
    };
  }, [
    handleBoardUpdate,
    board,
    activeCard,
    dueDate,
    removeDueDate,
    sourceList,
    startDate,
    saveCardChanges,
  ]);

  return (
    <DropdownButton
      icon="clock"
      buttonText="Due Date"
      header="Change Due Date."
      color={color}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <PickDueDate
          startDate={startDate}
          handleRemoveClick={handleRemoveClick}
          handleAddClick={handleAddClick}
          setStartDate={setStartDate}
        />
      </Suspense>
    </DropdownButton>
  );
};

export default AddCardDueDate;