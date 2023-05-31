import { Link } from 'react-router-dom';

export default function HighlightCard({ post }) {
  return (
    <>
      <div className="flex md:flex-col-reverse border">
        <div className="w-3/4 md:w-full md:p-4">
          <div className="md:p-4 flex flex-col justify-around">
            {post.Category ? <p className="text-sm underline m-2 uppercase">
            <Link to={`/topic/${post.Category.id}/${post.Category.name.toLowerCase().replace(/\s+/g, '-')}`}>{post.Category.name}</Link>
            </p> : ''}

            <p className="font-bold text-xl m-2 overflow-hidden hover:text-gray-600">
              <Link to={`/article/${post.id}/${post.slug}`}>{post.title}</Link>
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
