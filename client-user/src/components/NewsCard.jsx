import { Link } from 'react-router-dom';

export default function NewsCard({ post }) {
  return (
    <>
      <div className="flex flex-row md:flex-row-reverse border-r border-b py-8">
        <div className="w-3/4 md:w-full flex">
          <div className="px-4">
            <p className="font-bold text-lg md:text-2xl mx-2">
              <Link to={`/article/${post.id}/${post.slug}`}>{post.title} </Link>
            </p>

            <p className="hidden md:block m-2">{post.content.split('.').slice(0, 2).join('.')}.</p>
            <p className="font-mono text-xs m-2 uppercase">{post.User.username ? post.User.username : post.User.email}</p>
            <p className="font-mono text-xs m-2">{post.createdAt.split('T')[0].split('-').reverse().join('.')}</p>
            <div className="text-xs m-2 lowercase flex flex-row">
              <p className="mr-1">Tags:</p>
              {post.tags.map((tag, index) => (
                <p className="font-mono mr-3" key={tag.id}>
                  {tag.name} {index + 1 !== post.tags.length ? '|' : ''}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/4 md:w-full ">
          <img src={post.imgUrl} alt="Gambar" className="w-full h-full md:h-64 object-cover" />
        </div>
      </div>
    </>
  );
}
