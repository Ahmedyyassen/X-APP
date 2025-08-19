
import Header from "../components/Header";
import NewPost from "../components/NewPost";
import PostList from "../components/PostList";

const HomePage = () => {
    
  return (
    <div className="w-full h-screen overflow-auto ">
        <Header title="Home" />
        <NewPost />
        <PostList />
    </div>
  );
};

export default HomePage;
