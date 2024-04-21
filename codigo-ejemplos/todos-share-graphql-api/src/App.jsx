import { withAuthenticator, Text, Flex, View, Badge, Button } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { generateClient } from 'aws-amplify/api'
import { createTodo, deleteTodo, updateTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { onCreateTodo, onUpdateTodo, onDeleteTodo } from './graphql/subscriptions';
import { useState, useEffect } from 'react'
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
Amplify.configure(config);



function App({ user, signOut }) {

  const [todos, setTodos] = useState([]);
  const [isFetchingTodos, setIsFetchingTodos] = useState(true);

  const client = generateClient();


  useEffect(() => {
    const fetchTodos = async () => {
        const result = await client.graphql({ query: listTodos});
        setTodos(result.data.listTodos.items);
        setIsFetchingTodos(false);
        // console.log("Esto es el result = ", result.data.listTodos.items )
    }
    // fetchTodos();

    if (isFetchingTodos) {
      fetchTodos();
    }

    const createSub = client.graphql({ query: onCreateTodo }).subscribe({
      next: ({ data }) => { setTodos((todos) => [...todos, data.onCreateTodo]); 
      // console.log("Esta es la data = ", data); 
    }
    });

    const updateSub = client.graphql({ query:onUpdateTodo }).subscribe({
      next: ({ data }) => {
        setTodos(todos => {
          const toUpdateIndex = todos.findIndex(item => item.id === data.onUpdateTodo.id)
          if (toUpdateIndex === - 1) { // If the todo doesn't exist, treat it like an "add"
            return [...todos, data.onUpdateTodo]
          }
          return [...todos.slice(0, toUpdateIndex), data.onUpdateTodo, ...todos.slice(toUpdateIndex + 1)]
        })
      }
    });

    const deleteSub = client.graphql({ query: onDeleteTodo }).subscribe({
      next: ({ data }) => {
        setTodos(todos => {
          const toDeleteIndex = todos.findIndex(item => item.id === data.onDeleteTodo.id)
          return [...todos.slice(0, toDeleteIndex), ...todos.slice(toDeleteIndex + 1)]
        })
      }
    });

    // Cuando se desmonta el componente, se cancelan las suscripciones
    return () => {
      createSub.unsubscribe()
      updateSub.unsubscribe()
      deleteSub.unsubscribe()
    }
  }, [client])


  return (
    <div className='container'>
      <Flex direction={"column"} padding={8}>
        <Text>Logged in as <b>{user.username}</b> <Button variation='link' onClick={signOut}>Sign out</Button></Text>

        <Button onClick={async () => {
              client.graphql({
                  query: createTodo,
                  variables: {
                    input: {
                      content: window.prompt('content?'),
                    }
                  }
              })
          }}>Add todo</Button>

          {todos.map(todo => 
            <Flex direction="column" border="1px solid black" padding={8} key={todo.id}>
              <Text fontWeight={'bold'}>{todo.content}</Text>
              <View>👨‍👩‍👧‍👦 {todo.owners.map(owner => <Badge margin={4}>{owner}</Badge>)}</View>
              <Flex>

                <Button onClick={async () => {
                    client.graphql({ query: updateTodo,
                        variables: {
                            input: {
                              id: todo.id,
                              owners: [...todo.owners, window.prompt('Share with whom?')]
                            }
                        }
                    });
                }}>Share ➕</Button>

                <Button onClick={async () => {
                    client.graphql({
                        query: deleteTodo, 
                        variables: { 
                          input: {
                              id: todo.id 
                          }
                        }
                    });
                }
                
                }>Delete</Button>
              </Flex>
            </Flex>)}
      </Flex>
    </div>
  );
}

export default withAuthenticator(App);
