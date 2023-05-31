import { Link } from 'react-router-dom';

export default function HeadersCard({ post }) {
  return (
    <>
      <div className="grid grid-cols-6 justify-center items-center text-white bg-black mt-auto">
        <div className="col-span-6 md:col-span-4">
          <img src={post.imgUrl} alt="" className="h-auto" />
        </div>
        <div className="col-span-6 md:col-span-2">
          <p className="text-sm m-2 px-4 font-semibold uppercase tracking-widest underline">
            <Link to={`/topic/${post.Category.id}/${post.Category.name.toLowerCase().replace(/\s+/g, '-')}`}>{post.Category.name}</Link>
          </p>

          <p className="text-lg m-2 px-4 md:text-4xl font-bold">
            <Link to={`/article/${post.id}/${post.slug}`}>{post.title} </Link>
          </p>

          <p className="text-sm m-2 px-4 md:text-lg">"{post.content.split('.').slice(0, 2).join('.')}."</p>
          <p className="text-sm m-2 px-4 md:text-md font-mono uppercase">{post.User.username ? post.User.username : post.User.email}</p>
          <p className="text-sm m-2 px-4 md:text-md font-mono">{post.createdAt.split('T')[0].split('-').reverse().join('.')}</p>
          <div className="text-xs m-2 px-4 lowercase flex flex-row">
            <p className="mr-1">Tags:</p>
            {post.tags.map((tag, index) => (
              <p className="font-mono mr-3" key={tag.id}>
                {tag.name} {index + 1 !== post.tags.length ? '|' : ''}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
