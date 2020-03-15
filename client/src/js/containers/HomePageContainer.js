import React, { useContext, useEffect, useState, useCallback } from "react";

import { AppContext, HomepageContext } from "../utils/contextUtils";
import { getBoard } from "../utils/appUtils";
import { requestBoardUpdate } from "../apis/apiRequests";
import { useFetch } from "../utils/hookUtils";
import { withRouter } from "react-router-dom";
import HomePage from "../components/home/HomePage";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

const HomePageContainer = ({ history, user }) => {
  const { getBoardDetail } = useContext(AppContext);
  const [data, loading] = useFetch();
  const [boards, setBoards] = useState([]);

  const handleBoardStarClick = useCallback(
    id => {
      const board = getBoard(boards, id);

      if (board.category.includes("starred"))
        board.category.splice(board.category.indexOf("starred"));
      else board.category.push("starred");

      requestBoardUpdate(id, board);
      history.push("/");
    },
    [boards, history]
  );

  useEffect(() => {
    if (!data) return;

    setBoards(data);
    getBoardDetail();
  }, [getBoardDetail, data]);

  return data && boards && !loading ? (
    <HomepageContext.Provider value={{ boards, loading, handleBoardStarClick }}>
      <HomePage boards={boards} user={user} />
    </HomepageContext.Provider>
  ) : (
    <UILoadingSpinner />
  );
};

export default withRouter(HomePageContainer);
