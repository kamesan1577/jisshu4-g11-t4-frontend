import React, { useEffect, useState } from "react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import {
  ButtonGroup,
  ChakraProvider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls
} from "@chakra-ui/react"
import "./style.css"

function Options() {
  const localStorageKey = "apiKey";
  const [apiKey, setApiKey] = useState("NULL");
  useEffect(() => {
    chrome.storage.local.get([localStorageKey], (result) => {
      setApiKey(result[localStorageKey] || "NULL");
    });
  }, []);
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} aria-label="Submit" {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} aria-label="Close" {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} aria-label="Edit" {...getEditButtonProps()} />
      </Flex>
    )
  }

  const handleInputChange = (value) => {
    setApiKey(value);
    chrome.storage.local.set({ [localStorageKey]: value });
    chrome.runtime.sendMessage({ method: "setApiKey", key: "apiKey", value });
  };

  return (
    <ChakraProvider>
      <div>
        <div className="p-3">
          <p>API KEY</p>
          <Editable
            value={apiKey}
            fontSize="md"
            isPreviewFocusable={false}
            onChange={handleInputChange}>
            <Flex align="center">
              <EditablePreview />"
              <Input as={EditableInput} />
              <div className="p-3">
                <EditableControls />
              </div>
            </Flex>
          </Editable>
        </div>
      </div>
    </ChakraProvider>
  )
}

export default Options