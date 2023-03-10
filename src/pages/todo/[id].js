import Link from "next/link";
import { useRouter } from "next/router";

import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsconfig from "../../aws-exports";

import { listTodos } from "../../graphql/queries";

Amplify.configure(awsconfig);

const getList = async () => {
  try {
    const results = await API.graphql(graphqlOperation(listTodos));
    return results.data.listTodos.items;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getServerSideProps = async () => {
  const res = await getList();

  const data = res;

  //   const data = await res.json();
  //   console.log(data);

  // Pass data to the page via props
  return { props: { data } };
};

const Todo = ({ data }) => {
  const router = useRouter();

  //   console.log(router.query.id);

  console.log(data);

  return (
    <>
      <div>Hello</div>
      <p>
        <Link href="/">go back Home</Link>
      </p>
    </>
  );
};

export default Todo;
