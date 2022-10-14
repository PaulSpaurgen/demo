import { React, useState, useEffect } from "react";
import axios from "axios";
import {
  chakra,
  Box,
  Flex,
  Button,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { ScaleFade } from "@chakra-ui/react";
import ReactCardFlip from "react-card-flip";
import check from "../../../images/Done.svg";
import close from "../../../images/close.svg";
import time from "../../../images/Time.svg";
import fullIcon from "../../../images/Full.svg";
import "./index.css";

function Cards(props) {
  const [flashcardAnimation, setFlashcardAnimation] = useState(true);
  const [data, setData] = useState([]);
  const [flashCardCount, setFlashCardCount] = useState(1);
  const [isFlipped, setIsflipped] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const fetcData = (topic) => {
    var config = {
      method: "get",
      url: `https://ml-api.digest.ai/wikipedia/flashcards?topic=${topic}`,
      headers: {},
    };
    let data = [];
    axios(config)
      .then(function (response) {
        data = response.data.data.flashcards;
        setData(data);
        // setIsloading(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (props?.searchData?.topic.length > 0) {
      console.log(props.searchData);
      fetcData(props.searchData.topic);
    }
  }, []);
  const navigate = (status) => {
    let count = 0;
    setFlashcardAnimation(false);
    setIsflipped(false);
    setTimeout(() => {
      setFlashcardAnimation(true);
    }, 700);
    if (status === "plus") {
      count =
        flashCardCount < data.length ? flashCardCount + 1 : flashCardCount;
    } else {
      count = flashCardCount > 1 ? flashCardCount - 1 : flashCardCount;
    }
    setFlashCardCount(count);
  };
  return (
    <chakra.div w="100%" h="100%" bg="#11131E">
      <Box position="relative" h="6px" w="100%" bgColor="#262D3A">
        <Box
          position="absolute"
          w={`${(100 / data.length) * flashCardCount}%`}
          bg="#E76F00"
          h="6px"
        />
      </Box>
      <chakra.div
        w="100%"
        h={`${100 - 20}vh`}
        display="flex"
        justifyContent="space-around"
        flexDirection="column"
        alignItems="center"
      >
        {isloading ? (
          <div class="rainbow">
            <div class="test"><p>Loading....</p></div>
          </div>
        ) : (
          <Box
            id="card-container"
            h="479px"
            w="100%"
            bg="transparent"
            color="white"
            fontWeight="700"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="16px"
            fontSize="40px"
            border="none"
            onClick={() => {
              setIsflipped(!isFlipped);
            }}
          >
            <ScaleFade in={flashcardAnimation}>
              <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
                <div>
                  <Box
                    h="479px"
                    w="800px"
                    bg="#E76F00"
                    color="white"
                    fontWeight="700"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="16px"
                    fontSize="40px"
                    padding="40px"
                    border="none"
                  >
                    {data.length > 0 ? data[flashCardCount - 1].question : ""}
                  </Box>
                </div>
                <div>
                  <Box
                    h="479px"
                    w="800px"
                    bg="#ffff"
                    color="black"
                    fontWeight="700"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="16px"
                    fontSize="40px"
                    border="none"
                  >
                    {data.length > 0 ? data[flashCardCount - 1].answer : ""}
                  </Box>
                </div>
              </ReactCardFlip>
            </ScaleFade>
          </Box>
        )}

        <Box
          w="100%"
          display="flex"
          justifyContent="center"
          align-items="center"
        >
          <Flex
            w="80%"
            display="flex"
            align-items="center"
            justifyContent="space-between"
          >
            <Box d="flex" flexDirection="row" align-items="center">
              <Image mt="20px" src={time} h="32px" w="32px"></Image>
            </Box>
            <Flex alignItems="center" justifyContent="center">
              <Button
                colorScheme="blackAlpha"
                mr="64px"
                w="232px"
                h="56px"
                borderRadius="34px"
                bgColor="#1C212D"
                color="white"
                onClick={() => {
                  navigate("minus");
                }}
              >
                <Image mr="5px" src={close} /> Repeat
              </Button>
              <Box color="white">
                {flashCardCount}/{data.length}
              </Box>
              <Button
                colorScheme="blackAlpha"
                w="232px"
                h="56px"
                borderRadius="34px"
                bgColor="#1C212D"
                color="white"
                ml="64px"
                onClick={() => {
                  navigate("plus");
                }}
              >
                Learned <Image ml="5px" src={check} />
              </Button>
            </Flex>
            <Flex>
              <Image src={fullIcon} />
            </Flex>
          </Flex>
        </Box>
      </chakra.div>
    </chakra.div>
  );
}

export default Cards;
