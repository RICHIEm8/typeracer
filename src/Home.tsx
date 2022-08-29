import React, { useEffect } from 'react';
import {
  Flex,
  Text,
  VStack,
  Heading,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Box,
  HStack,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import _, { words } from 'lodash';
import { faker } from '@faker-js/faker';

interface Props {
  actual: string;
  expected: string;
}

const Character = (props: Props) => {
  const { actual, expected } = props;
  const isValid = actual === expected;
  const isWhiteSpace = actual === ' ';

  return (
    <Text
      fontSize={'3xl'}
      color={!isValid && !isWhiteSpace ? 'red' : 'white'}
      bg={!isValid && isWhiteSpace ? 'red' : 'transparent'}
      display={'inline'}
    >
      {expected}
    </Text>
  );
};

export const Home = () => {
  const [wordList, setWordList] = React.useState<string>(() => {
    return faker.random.words(20).toLowerCase();
  });

  const [input, setInput] = React.useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        setInput(input.slice(0, -1));
      } else if (
        e.key !== 'Meta' &&
        e.key !== 'Enter' &&
        e.key !== 'Alt' &&
        e.key !== 'Control' &&
        e.key !== 'CapsLock' &&
        e.key !== 'Shift'
      ) {
        setInput((prevInput) => prevInput.concat(e.key));
        console.log(input);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  const typedCharacters = input.split('').map((char, index) => {
    return <Character key={index} actual={char} expected={wordList[index]} />;
  });

  return (
    <Flex flexDir={'column'} bg={'#333437'}>
      <VStack h={'81vh'} mx={'10%'} my={'5%'} spacing={20}>
        <Heading alignSelf={'flex-start'} color={'#d1d0c5'}>
          typeracer
        </Heading>
        <Box position={'relative'} wordBreak={'break-all'} w={'2xl'}>
          <Text fontSize={'3xl'} color={'#636669'}>
            {wordList}
          </Text>
          <Box position={'absolute'} inset={0}>
            {typedCharacters}
          </Box>
        </Box>
        <Popover trigger={'hover'}>
          <PopoverTrigger>
            <IconButton
              aria-label="Reset"
              icon={<RepeatIcon />}
              color={'#636669'}
              size={'lg'}
              bg={'none'}
              _hover={{ bg: 'none', color: '#d1d0c5' }}
              _active={{ bg: 'none' }}
            />
          </PopoverTrigger>
          <PopoverContent bg={'black'} maxW={150} border={'black'}>
            <PopoverArrow bg={'black'} />
            <PopoverBody alignSelf={'center'} color={'#d1d0c5'} fontWeight={'extrabold'}>
              Restart Test
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </VStack>
    </Flex>
  );
};
