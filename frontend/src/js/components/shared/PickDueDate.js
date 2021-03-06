import React, { Fragment, lazy, Suspense, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "semantic-ui-react";

import UIDivider from "./UIDivider";

const DatePicker = lazy(() => import("react-datepicker"));

const Container = styled.div`
  padding: 15px 10px;
  width: 300px;
`;

const ButtonWrapper = styled.div`
  padding: 10px;
`;

const PickDueDate = ({ startDate, setStartDate, handleUpdateDueDate }) => {
  const [message, setMessage] = useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Fragment>
        <Container>
          <DatePicker
            className="ui fluid focus input"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </Container>

        {!message && (
          <>
            <UIDivider />
            <ButtonWrapper>
              <Button
                content="Add"
                compact
                positive
                onClick={() => {
                  setMessage(true);
                  handleUpdateDueDate();
                }}
              />
              <Button
                content="Remove"
                compact
                negative
                floated="right"
                onClick={() => handleUpdateDueDate(true)}
              />
            </ButtonWrapper>
          </>
        )}
      </Fragment>
    </Suspense>
  );
};

PickDueDate.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  setStartDate: PropTypes.func.isRequired,
  handleUpdateDueDate: PropTypes.func.isRequired,
};

export default PickDueDate;
