import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, editPost } from '../store/actions/postAction';
import { showError, showSuccess } from '../hooks/swalModal';

export default function PostForm(props) {
  const dispatch = useDispatch();
  const { open, onClose, categories, postForm, setPostForm } = props;
  const classActive = open ? 'block' : 'hidden';

  // Handle input form ----
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  // Tags -----------------
  const [tagsName, setTagsName] = useState('');
  const [validTag, setValidTag] = useState(true);

  const handleAddTags = () => {
    if (!tagsName) return setValidTag(false);
    const formattedTag = tagsName.toLowerCase();
    setPostForm((prevForm) => ({
      ...prevForm,
      tags: [...prevForm.tags, { name: formattedTag }],
    }));
    setTagsName('');
  };

  const handleTagsNameChange = (e) => {
    setValidTag(true);
    setTagsName(e.target.value);
  };

  const handleRemoveTags = (index) => {
    setPostForm((form) => {
      const updatedTags = [...form.tags];
      updatedTags.splice(index, 1);
      return {
        ...form,
        tags: updatedTags,
      };
    });
  };

  // Handle submit -----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postForm.id) {
      dispatch(addPost(postForm))
        .then(() => {
          showSuccess('addPost');
          onClose();
        })
        .catch((error) => {
          showError(error);
        });
    } else {
      dispatch(editPost(postForm))
        .then(() => {
          showSuccess('editPost');
          onClose();
        })
        .catch((error) => {
          showError(error);
        });
    }
  };

  // Handle cancel -------
  const handleCancel = () => {
    setPostForm({
      title: '',
      content: '',
      categoryId: '',
      imgUrl: '',
      tags: [],
    });
    setTagsName('');
    setValidTag(true);
    onClose();
  };

  return (
    <>
      <div className={`${classActive}`}>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white p-8 relative z-10 w-2/4">
            <h2 className="text-2xl mb-4 text-black font-semibold">{postForm.id ? 'Edit Post Data' : 'Add New Post'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="title"
                          value={postForm.title}
                          onChange={handleInputChange}
                          className="block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></input>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                        Content
                      </label>
                      <div className="mt-2">
                        <textarea
                          name="content"
                          value={postForm.content}
                          onChange={handleInputChange}
                          rows="3"
                          className="block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-auto"
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                      <div className="mt-2">
                        <select name="categoryId" value={postForm.categoryId} onChange={handleInputChange} className="text-gray-900 w-full border p-2 font-semibold">
                          <option value="" disabled>
                            Select category
                          </option>
                          {categories?.map((el) => (
                            <option value={el.id} key={el.name} className="">
                              {el.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Image URL</label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="imgUrl"
                          value={postForm.imgUrl}
                          onChange={handleInputChange}
                          className="block w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></input>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label className="block text-sm font-medium leading-6 text-gray-900">Tags</label>
                      <div className="flex flex-wrap items-center mt-2 ">
                        {postForm.tags.map((tag, index) => (
                          <span key={index} className="mb-1 mr-2 border-0 shadow-sm ring-1 ring-inset px-1 ring-gray-300 text-black">
                            {tag.name}
                            <button type="button" className="ml-3 text-xs" onClick={() => handleRemoveTags(index)}>
                              ❌
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center mt-2">
                        <input type="text" name="tagsName" className="text-black px-3 border-0 shadow-sm ring-1 ring-inset ring-gray-300 py-1 mr-3" value={tagsName} onChange={handleTagsNameChange} />
                        <button type="button" className="border-2 py-1 px-2 text-black" onClick={handleAddTags}>
                          Add tags
                        </button>
                      </div>
                      {!validTag && <div className="text-red-500 text-xs font-mono mt-1">Tag name cannot be empty</div>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  {postForm.id ? 'Edit Post' : 'Add Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
