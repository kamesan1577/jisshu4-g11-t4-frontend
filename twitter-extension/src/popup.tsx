import {
  Button,
  ChakraProvider,
  Divider,
  Select,
  Switch
} from "@chakra-ui/react"
import { useState } from "react"

import "./style.css"

function IndexPopup() {
  const [data, setData] = useState("")

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
          <div className="flex items-center justify-center">
            <div className="flex-none">
              <svg width='18px' height='18px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'><title>social_x_line</title><g id='Icon' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Logo' transform='translate(-48.000000, -288.000000)'><g id='social_x_line' transform='translate(48.000000, 288.000000)'><path d='M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5935,23.2578 L12.5819,23.2595 L12.5109,23.295 L12.4919,23.2987 L12.4767,23.295 L12.4057,23.2595 C12.3958,23.2564 12.387,23.259 12.3821,23.2649 L12.378,23.2758 L12.3609,23.7031 L12.3659,23.7235 L12.3769,23.7357 L12.4805,23.8097 L12.4953,23.8136 L12.5071,23.8097 L12.6107,23.7357 L12.6233,23.7197 L12.6267,23.7031 L12.6096,23.2758 C12.6076,23.2657 12.601,23.2593 12.5935,23.2578 Z M12.8584,23.1453 L12.8445,23.1473 L12.6598,23.2397 L12.6499,23.2499 L12.6472,23.2611 L12.6651,23.6906 L12.6699,23.7034 L12.6784,23.7105 L12.8793,23.8032 C12.8914,23.8069 12.9022,23.803 12.9078,23.7952 L12.9118,23.7812 L12.8777,23.1665 C12.8753,23.1546 12.8674,23.147 12.8584,23.1453 Z M12.143,23.1473 C12.1332,23.1424 12.1222,23.1453 12.1156,23.1526 L12.1099,23.1665 L12.0758,23.7812 C12.0751,23.7927 12.0828,23.8019 12.0926,23.8046 L12.1083,23.8032 L12.3092,23.7105 L12.3186,23.7024 L12.3225,23.6906 L12.3404,23.2611 L12.3372,23.2485 L12.3278,23.2397 L12.143,23.1473 Z' id='MingCute' fill-rule='nonzero'></path><path d='M19.7526,4.65852 C20.1163,4.24288 20.0741,3.61112 19.6585,3.24744 C19.2429,2.88375 18.6111,2.92587 18.2474,3.34151 L13.1367,9.18231 L8.80001,3.40001 C8.61115,3.14821 8.31476,2.99999773 8.00000128,2.99999773 L4.00000128,2.99999773 C3.62123,2.99999773 3.27497,3.21402 3.10558,3.5528 C2.93619,3.89158 2.97274,4.297 3.20001,4.60001 L9.63673,13.1823 L4.24743,19.3415 C3.88375,19.7571 3.92586,20.3889 4.3415,20.7526 C4.75714,21.1163 5.3889,21.0742 5.75258,20.6585 L10.8633,14.8177 L15.2,20.6 C15.3889,20.8518 15.6852,21.0000537 16.0000013,21.0000537 L20.0000013,21.0000537 C20.3788,21.0000537 20.725,20.786 20.8944,20.4472 C21.0638,20.1084 21.0273,19.703 20.8,19.4 L14.3633,10.8177 L19.7526,4.65852 Z M16.50001,19 L6.00001,5.00001 L7.50001,5.00001 L18.00001,19 L16.50001,19 Z' id='形状' fill='#09244BFF'></path></g></g></g></svg>              
            </div>
            <div className="flex-none">
              <h1 className="text-lg px-1">Extension</h1>
            </div>
          </div>
        </div>
        <div className="container px-2 pt-2">
          <div className="flex items-center pb-2">
            <div className="flex-1">
              <h2>タイムラインの検閲</h2>
            </div>
            <div className="flex-none">
              <Switch colorScheme="teal" id="checkTimeline" />
            </div>
          </div>
          <div className="flex items-center pb-2">
            <div className="flex-1">
              <h2>ポスト文章の検閲</h2>
            </div>
            <div className="flex-none">
              <Switch colorScheme="teal" id="checkTimeline" />
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
