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
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import _ from 'lodash';
import { faker } from '@faker-js/faker';

export const Home = () => {
  const [wordList, setWordList] = React.useState<{ value: string; index: number }[]>(() => {
    const words: string[] = faker.random.words(5).toLowerCase().split('');

    const chars = _.map(words, (value, index) => ({ value, index }));

    return chars;
  });
  const [input, setInput] = React.useState<{ value: string; index: number }[]>([
    { value: '', index: 0 },
  ]);

  const words = _.map(wordList, (word) => {
    return word.value;
  });
  const typedCharacters = _.map(input, (value) => {
    return value.value;
  });

  useEffect(() => {
    const charIndex = _.findLastIndex(input);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        setInput(_.dropRight(input));
      } else if (
        e.key !== 'Meta' &&
        e.key !== 'Enter' &&
        e.key !== 'Alt' &&
        e.key !== 'Control' &&
        e.key !== 'CapsLock' &&
        e.key !== 'Shift'
      ) {
        setInput([...input, { value: e.key, index: charIndex }]);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  return (
    <Flex flexDir={'column'} bg={'#333437'}>
      <VStack h={'81vh'} mx={'10%'} my={'5%'} spacing={20}>
        <Heading alignSelf={'flex-start'} color={'#d1d0c5'}>
          typeracer
        </Heading>
        <Box position={'relative'} wordBreak={'break-all'}>
          <Text fontSize={'3xl'} color={'#636669'}>
            {words}
          </Text>
          <Text fontSize={'3xl'} color={'white'} position={'absolute'} top={0} animation={'typing'}>
            {typedCharacters}
          </Text>
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
