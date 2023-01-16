import { SetStateAction, Dispatch, FormEvent } from "react";
import { TableContents } from "../Table/Table";

interface AlertModalProps {
  setContents: Dispatch<SetStateAction<TableContents>>;
}

export default function AlertModal({ setContents }: AlertModalProps) {
  function onSubmitEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContents((contents) => ({
      ...contents,
      rowContents: [
        ...contents.rowContents,
        {
          alert: (e.target as any).elements[0].value,
          status: "",
          updates: [],
        },
      ],
    }));
  }

  return (
    <form data-testid="form" onSubmit={onSubmitEvent}>
      <label> Add new alert: </label>
      <input type="text" id="alert" name="alert" />
      <button type="submit"> Add </button>
    </form>
  );
}
