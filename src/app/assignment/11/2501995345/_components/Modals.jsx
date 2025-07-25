"use client";

import { useContext } from "react";
import ModalContext from "../_contexts/ModalContext";
import { MODAL_TYPES } from "../_libs/constants";
import AddTaskModal from "./modals/AddTaskModal";

export default function Modals() {
  const { modal } = useContext(ModalContext);

  return <>{modal === MODAL_TYPES.ADD_TASK && <AddTaskModal />}</>;
}
