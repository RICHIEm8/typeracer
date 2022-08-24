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
  const [wordList, setWordList] = React.useState(() => faker.random.words(5).toLowerCase());
  console.log('wordlist', wordList);
  const [input, setInput] = React.useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Meta' && e.key !== 'Enter' && e.key !== 'Alt' && e.key !== 'Control') {
        input.push(e.key);
        console.log(input);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  const typedCharacters = input.join('');

  return (
    <Flex minH={'100%'} flexDir={'column'} bg={'#333437'}>
      <VStack minH={'100vh'} mx={'10%'} my={'5%'} spacing={20}>
        <Heading alignSelf={'flex-start'} color={'#d1d0c5'}>
          typeracer
        </Heading>
        <Box position="relative">
          <Text fontSize={'3xl'} color={'#636669'}>
            {wordList}
          </Text>
          <Text fontSize={'3xl'} color={'white'} position="absolute" top={0}>
            {typedCharacters}
          </Text>
        </Box>
        <Popover trigger="hover">
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
