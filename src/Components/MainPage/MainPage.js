import { React, useState, useEffect } from "react";
import {
  Box,
  chakra,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Tag,
  Icon,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
// HiOutlineDocumentText
import { HiOutlineDocumentText } from "react-icons/hi";
import Body from "./Body/Body";
import Cards from "./Cards/Cards";
function MainPage() {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isSearched, setIsSearched] = useState(false);

  // UI modifing states
  const [searchBox, setSearchBox] = useState(true);

  const [showResult, setShowResult] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const fetchData = async (topic) => {
    var config = {
      method: "get",
      url: `https://ml-api.digest.ai/wikipedia/search?topic=${topic}`,
      headers: {},
    };
    let data = [];
    await axios(config)
      .then(function (response) {
        data = response.data;
        setSearchResult(data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return data;
  };
  useEffect(() => {
    fetchData();
  }, []);
  const changeState = () => {
    setShowResult(false);
    setShowCards(true);
  };
  useEffect(() => {
    if (selectedContent !== null) {
      if (selectedContent?.topic === input) {
        setSearchBox(false);
      } else {
        setSearchBox(true);
      }
    }
    setIsSearched(false);
    if (input.length >= 3) {
      fetchData(input);
    } else {
      setSearchResult([]);
    }
  }, [input]);
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchResult([]);
      setShowResult(true);
      setIsSearched(true);
    }
  };
  const setInputSearch = (val) => {
    console.log(val);
    setSearchBox(false);
    setSelectedContent(val);
    setInput(val.topic);
  };
  return (
    <chakra.div bg="#11131E" w="100%" h="100vh">
      <Flex
        w="100%"
        h="104px"
        // alignItems="center"
        justifyContent="center"
        borderBottom="2px solid #262D3A"
      >
        <InputGroup
          mt="24px"
          h={input.length > 0 ? "fit-content" : "56px"}
          w="617px"
          bg="#262D3A"
          borderRadius="4px"
          transition="transform 250ms"
          display="flex"
          flexDirection="column"
        >
          <InputLeftElement
            pointerEvents="none"
            children={
              <SearchIcon
                mt="16px"
                ml="24px"
                mr="24px"
                color="gray.300"
                h="16px"
                w="16px"
              />
            }
          />
          <Input
            h="56px"
            w="617px"
            type="text"
            placeholder="Type your search request"
            color="#cdd3d7"
            border="none"
            value={input}
            focusBorderColor="none"
            onKeyDown={(e) => handleSearch(e)}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <InputRightElement />
          {input.length > 0 && searchBox ? (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              width="100%"
              padding="26px"
              paddingTop={0}
            >
              <Tag
                bg="#262D3A"
                color="#ffff"
                padding="10px"
                paddingLeft={0}
                cursor="pointer"
                fontSize={10}
                fontWeight="600"
              >
                {" "}
                Results:
              </Tag>
              {searchResult.length > 0 ? (
                searchResult.map((res, index) => (
                  <Flex key={index}>
                    <Icon
                      as={HiOutlineDocumentText}
                      padding="10px"
                      w="40px"
                      h="40px"
                      color="#cdd3d7"
                    ></Icon>
                    <Tag
                      bg="#262D3A"
                      color="#cdd3d7"
                      padding="10px"
                      paddingLeft={0}
                      cursor="pointer"
                      onClick={() => {
                        setInputSearch(res);
                      }}
                    >
                      {res.topic}
                    </Tag>
                  </Flex>
                ))
              ) : (
                <></>
              )}
            </Box>
          ) : (
            <></>
          )}
        </InputGroup>
      </Flex>
      <Box>
        {showResult && (
          <Body
            searchData={selectedContent}
            isSearched={isSearched}
            changeDisp={changeState}
          />
        )}
      </Box>
      <Box>{showCards && <Cards searchData={selectedContent} />}</Box>
    </chakra.div>
  );
}

export default MainPage;
