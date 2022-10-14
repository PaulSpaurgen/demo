import {
  chakra,
  Image,
  Box,
  Flex,
  Icon,
  Tag,
  Heading,
  Button,
  Container,
} from "@chakra-ui/react";
import { React, useState, useEffect } from "react";
import Hero from "../../../images/hero.jpg";
import logo from "../../../images/logo.svg";
import { BsFillFileLockFill, BsThreeDots } from "react-icons/bs";
import { MdOutlineMenu } from "react-icons/md";

function Body(props) {
  const [data, setData] = useState();
  const [clicks, setClicks] = useState(0);
  const [btnTxt, setbtnTxt] = useState("Learn");

  useEffect(() => {
    if (props.isSearched) {
      setData(props.searchData);
      console.log(props)
    }
  }, [props]);
  useEffect(() => {
    if (clicks === 1) {
      setbtnTxt("Continue Learn");
    } else if (clicks === 2) {
      props.changeDisp();
    }
  }, [clicks]);
  return (
    <chakra.div w="100%" h="fit-content" bg="#11131E">
      <Image
        src={Hero}
        objectFit="cover"
        w="100%"
        h="248px"
        borderBottom="2px solid #262D3A"
      />
      <Box
        padding="96px 128px 128px 96px"
        h="fit-content"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        gap="32px"
      >
        <Flex alignItems="center">
          <Icon as={BsFillFileLockFill} w="16px" h="16px" color="gray.600" />
          <Tag bg="#11131E" color="gray.600" fontSize="16px">
            Your Progress:
          </Tag>
          <Flex gap="15px">
            <Box
              padding="2px"
              w="100px"
              bg={clicks >= 1 ? "#E3AB3D" : "gray.700"}
              borderRadius="4px"
            />
            <Box padding="2px" w="100px" bg="gray.700" borderRadius="4px" />
            <Box padding="2px" w="100px" bg="gray.700" borderRadius="4px" />
          </Flex>
        </Flex>
        <Flex>
          <Heading fontSize="60px" color="white">
            {data?.topic}
          </Heading>
        </Flex>
        <Flex gap="30px" alignItems="center" marginTop="16px">
          <Button
            w="295px"
            h="56px"
            bg="#1190C7"
            colorScheme="cyan"
            color="white"
            borderRadius="30px"
            fontSize="22px"
            fontWeight="600"
            padding="10px"
            onClick={() => {
              setClicks(clicks + 1);
            }}
          >
            <p>{btnTxt}</p>{" "}
            <Image src={logo} mt="5px" ml="8px" w="22px" h="22px" />
          </Button>
          <BsThreeDots color="white" fontSize="24px" cursor="pointer" />
        </Flex>
        <Flex alignItems="center" gap="5px" marginTop="16px">
          <MdOutlineMenu color="#686c6e" />
          <Heading color="gray.600" fontSize="16px">
            Demo Context
          </Heading>
        </Flex>
        <Heading fontSize="24px" color="white" fontWeight="600">
          Summary
        </Heading>
        <Container maxW="100%" color="#FFFFFF">
          {data?.summary}
        </Container>
      </Box>
    </chakra.div>
  );
}
// top padding is 10px
// right padding is 5px
// bottom padding is 15px
// left padding is 20px

export default Body;
