import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext
} from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { BoardContext, AppContext } from "../utils/contextUtils";
import { PERMISSIONS } from "../constants/constants";
import {
  requestBoardUpdate,
  requestBoardDelete,
  requestBoardDetail,
  requestUserInvite
} from "../apis/apiRequests";

import { getActivity, emptyFunction, resetForm } from "../utils/appUtils";
import Board from "../components/boardDetail/Board";
import BoardHeader from "../components/boardDetail/BoardHeader";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";

const StyledContainer = styled.div`
  background-attachment: fixed;
  background-color: ${props => props.bgColor};
  height: 99vh;
  padding-top: ${props => (props.mobile ? "27%" : "2%")};
  position: relative;
`;

const ContentDiv = styled.div`
  display: grid;
  height: ${props => (props.mobile ? "79vh" : "93vh")};
  left: 0;
  overflow-y: hidden;
  position: absolute;
  top: ${props => (props.mobile ? "20%" : "7%")};
  width: 100vw;
`;

const BoardContainer = ({ match, history, auth }) => {
  const { id } = match.params;
  const { device } = useContext(AppContext);

  const [board, setBoard] = useState(null);
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(false);
  const [starred, setStarred] = useState(null);
  const [updatedField, setUpdatedField] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [inviteDone, setInviteDone] = useState(false);

  const handleShowMenuClick = () => setShowSideBar(!showSideBar);

  const backendUpdate = useMemo(
    () => (changes, fieldId, activity) => {
      saveBoardChanges(changes);
      setUpdatedField({ fieldId, activity });
    },
    []
  );

  const saveBoardChanges = changes => setBoard(changes);

  const changeBoardAccessLevel = option => {
    const newBoard = {
      ...board,
      accessLevel: { ...PERMISSIONS, [option]: true }
    };

    backendUpdate(newBoard, "accessLevel", "changeAccess");
  };

  const handleDeleteBoard = useCallback(() => {
    requestBoardDelete(id);
    history.push("/");
  }, [history, id]);

  const handleColorPick = color => {
    const newBoard = {
      ...board,
      styleProperties: { ...board.styleProperties, color }
    };

    backendUpdate(newBoard, "styleProperties", "color");
  };

  const handleBoardStarClick = () => {
    if (board.category.includes("starred")) {
      board.category.splice(board.category.indexOf("starred"));
      setStarred(false);
    } else {
      board.category.push("starred");
      setStarred(true);
    }

    backendUpdate(board, "category", starred ? "removeStar" : "starred");
  };

  useEffect(() => {
    if (!invite) return emptyFunction();
    setLoading(true);
    const inviteUser = async () => {
      await requestUserInvite(id, invite)
        .then(res => {
          setInviteDone(true);
          setLoading(false);
          setInvite(null);
          resetForm("invite-input");
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    };

    inviteUser();
  }, [invite, id]);

  const handleInviteClick = email => setInvite(email);

  useEffect(() => {
    if (!updatedField) return emptyFunction();
    const serverUpdate = async () => {
      const { fieldId, activity } = updatedField;
      const { fname } = auth.user;
      const userAction = getActivity(fname, activity);
      board.activities.push({ activity: userAction, createdAt: Date.now() });
      const update = {
        [fieldId]: board[fieldId],
        activities: board.activities
      };

      await requestBoardUpdate(id, update).then(() => {});
    };

    serverUpdate();
    setUpdatedField(null);
  }, [id, updatedField, board, auth]);

  useEffect(() => {
    if (board) return emptyFunction();
    const fetchData = async () =>
      await requestBoardDetail(id)
        .then(res => {
          return setBoard(res.data);
        })
        .catch(error => history.push("/"));

    fetchData();
  }, [board, updatedField, id, history]);

  return !board ? (
    <UILoadingSpinner />
  ) : (
    <BoardContext.Provider
      value={{
        backendUpdate,
        board,
        changeBoardAccessLevel,
        handleBoardStarClick,
        handleColorPick,
        handleDeleteBoard,
        handleInviteClick,
        handleShowMenuClick,
        inviteDone,
        id,
        loading,
        saveBoardChanges,
        showSideBar
      }}
    >
      <StyledContainer bgColor={board.styleProperties.color}>
        <BoardHeader />
        <ContentDiv mobile={device.mobile}>
          <Board />
        </ContentDiv>
      </StyledContainer>
    </BoardContext.Provider>
  );
};

export default withRouter(BoardContainer);
