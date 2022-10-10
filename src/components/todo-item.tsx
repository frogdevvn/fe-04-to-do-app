import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, HStack, IconButton, Text } from '@chakra-ui/react';

export type Todo = {
  id: number;
  task: string;
  isCompleted: boolean;
};

export type TodoItemProps = {
  todo: Todo;
  onClickEdit: (curSelectTodo: Todo) => void;
  onClickDelete: (curSelectTodo: Todo) => void;
  onClickComplete: (curSelectTodo: Todo) => void;
};

const TodoItem = ({
  todo,
  onClickEdit,
  onClickDelete,
  onClickComplete
}: TodoItemProps) => {
  return (
    <Flex
      alignItems="center"
      justify="space-between"
      width="100%"
      borderWidth="1px"
      borderRadius="md"
      borderColor="teal.100"
      p={4}
    >
      <Text
        fontWeight="medium"
        as={todo.isCompleted ? 's' : 'p'}
        color={todo.isCompleted ? 'red' : 'black'}
      >
        {todo.task}
      </Text>
      <HStack>
        <IconButton
          aria-label="Edit task"
          variant="outline"
          size="sm"
          colorScheme="teal"
          hidden={todo.isCompleted}
          icon={<EditIcon />}
          onClick={() => onClickEdit(todo)}
        />
        <IconButton
          aria-label="Complete task"
          variant="outline"
          size="sm"
          colorScheme="teal"
          hidden={todo.isCompleted}
          icon={<CheckIcon />}
          onClick={() => onClickComplete(todo)}
        />
        <IconButton
          aria-label="Delete task"
          variant="outline"
          size="sm"
          colorScheme="teal"
          icon={<DeleteIcon />}
          onClick={() => onClickDelete(todo)}
        />
      </HStack>
    </Flex>
  );
};
export default TodoItem;
