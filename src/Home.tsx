import React from 'react';
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
  Textarea,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';

import _ from 'lodash';

export const Home = () => {
  const randomWords = require('random-words');
  const wordList = randomWords(50);

  console.log({ wordList });
  return (
    <Flex minH={'100%'} flexDir={'column'} bg={'#333437'}>
      <VStack minH={'100vh'} mx={'10%'} my={'5%'} spacing={20}>
        <Heading alignSelf={'flex-start'} color={'#d1d0c5'}>
          typeracer
        </Heading>
        <Text fontSize={'3xl'} color={'#636669'}>
          {_.map(wordList, (word) => {
            return word + ' ';
          })}
        </Text>
        <Textarea bg="teal"></Textarea>
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
