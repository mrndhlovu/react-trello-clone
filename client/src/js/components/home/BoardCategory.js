import React, { useContext } from "react";
import styled from "styled-components";

import { Header, Icon } from "semantic-ui-react";

import { AppContext, HomepageContext } from "../../utils/contextUtils";
import CreateNewBoard from "../sharedComponents/CreateNewBoard";
import Summary from "./Summary";

const Category = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    ${props => (props.mobile ? "100%" : props.tablet ? "33.33333%" : "25%")}
  );
  vertical-align: top;
`;

const Span = styled(Header)`
  font-size: 14px !important;
  font-weight: 400;

  &:after {
    content: '${props => props.text}'
  }

`;

const BoardCategory = ({
  category,
  header,
  icon,
  isDefault,
  isLast,
  showNewBoardModal
}) => {
  const { tablet, loading, handleBoardStarClick, device } = useContext(
    AppContext
  );
  const { boards } = useContext(HomepageContext);

  return (
    <>
      <Span text={header}>
        <Icon name={`outline ${icon}`} />
      </Span>
      <Category mobile={device.mobile} tablet={tablet} isLast={isLast}>
        {!loading &&
          boards.map(
            board =>
              board.category.includes(category) && (
                <Summary
                  color={board.styleProperties.color}
                  handleBoardStarClick={handleBoardStarClick}
                  header={board.title}
                  key={board._id}
                  starred={board.category.includes("starred")}
                  id={board._id}
                />
              )
          )}
        {isDefault && <CreateNewBoard showNewBoardModal={showNewBoardModal} />}
      </Category>
    </>
  );
};

export default BoardCategory;
