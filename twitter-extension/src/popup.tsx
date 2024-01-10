import {
  Button,
  ChakraProvider,
  Divider,
  Select,
  Switch
} from "@chakra-ui/react"

import "./style.css"
import { useEffect, useState } from "react";
import { Storage } from "@plasmohq/storage"
const storage = new Storage()

function IndexPopup() {
  const [checkedItems, setCheckedItems] = useState<{ checkTimeline?: boolean, checkPost?: boolean }>({ checkTimeline: false, checkPost: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await storage.get('checkboxState');
        if (storedData) {
          setCheckedItems(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error fetching data from local storage:', error);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    // 新しい状態を設定
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const saveData = async () => {
      try {
        await storage.set('checkboxState', JSON.stringify(checkedItems));
      } catch (error) {
        console.error('Error saving data to local storage:', error);
      }
    };

    saveData();
  }, [checkedItems]);

  return (
    <ChakraProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          /*padding: 16,*/
          width: 250
        }}
        className="">
        <div className="text-center bg-gray-100 py-3">
          <div>
            <h1>環境設定</h1>
          </div>
        </div>
        <div className="container px-2 pt-2">
          <div className="flex items-center pb-2">
            <div className="flex-1">
              <h2>タイムラインの検閲</h2>
            </div>
            <div className="flex-none">
              <Switch colorScheme="teal" id="checkTimeline" type="checkbox" name="checkTimeline" isChecked={checkedItems.checkTimeline || false} onChange={handleCheckboxChange}/>
            </div>
          </div>
          <div className="flex items-center pb-2">
            <div className="flex-1">
              <h2>ポスト文の検閲</h2>
            </div>
            <div className="flex-none">
              <Switch colorScheme="teal" id="checkPost" type="checkbox" name="checkPost" isChecked={checkedItems.checkPost || false} onChange={handleCheckboxChange} />
            </div>
          </div>
          <Divider />
          <div className="flex items-center py-2">
            <div className="flex-1">
              <h2>検閲レベル</h2>
            </div>
            <div className="flex-1">
              <Select placeholder="Please select" size="xs">
                <option value="option1">Level 1</option>
                <option value="option2">Level 2</option>
                <option value="option3">Level 3</option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  )
}

export default IndexPopup
