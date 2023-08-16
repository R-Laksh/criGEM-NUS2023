import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Avatar from "./Avatar";
import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_POST, ADD_SPACE } from "../graphql/mutations";
import client from "../apollo-client";
import { GET_SPACE_BY_TOPIC } from '@/graphql/queries';
import { toast } from 'react-hot-toast';
import { GET_ALL_POSTS } from "../graphql/queries";

type FormData = {
    postTitle: string;
    postBody: string;
    postImage: string;
    space: string;
};

type Props = {
    space?: string
}

function PostBox({ space }: Props) {
    console.log(space);
    const { data: session } = useSession();
    const [addPost] = useMutation(ADD_POST, {
        refetchQueries: [
            GET_ALL_POSTS,
            'postList'
        ]
    });
    const [addSpace] = useMutation(ADD_SPACE);
    
    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = handleSubmit(async (formData) => {
        const notification = toast.loading('Creating new post...');

        try {
            const { data: { getSpaceListByTopic } } = await client.query({
                query: GET_SPACE_BY_TOPIC,
                variables: {
                    topic: space || formData.space
                }
            });

            const spaceExists = getSpaceListByTopic.length > 0;

            if (!spaceExists) {
                const { data: { insertSpace: newSpace } } = await addSpace({
                    variables: {
                        topic: formData.space
                    }
                });

                const image = formData.postImage || '';

                const { data: { insertPost: newPost } } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        space_id: newSpace.id,
                        title: formData.postTitle,
                        name: session?.user?.name,
                    },
                });

                setValue('postBody', '');
                setValue('postImage', '');
                setValue('postTitle', '');
                setValue('space', '');

                toast.success('New Post Created!', {
                    id: notification
                });
            } else {
                const image = formData.postImage || '';

                const { data: { insertPost: newPost } } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        space_id: getSpaceListByTopic[0].id,
                        title: formData.postTitle,
                        name: session?.user?.name,
                    }
                });

                setValue('postBody', '');
                setValue('postImage', '');
                setValue('postTitle', '');
                setValue('space', '');

                toast.success('New Post Created!', {
                    id: notification
                });
            }
        } catch (error) {
            toast.error('Whoops something went wrong!', {
                id: notification
            });
        }
    });

    return (
        <form onSubmit={onSubmit} className="sticky top-20 z-50 rounded-md border border-gray-300 bg-white p-2">
            <div className="flex items-center space-x-3">
                <Avatar />
                <input
                    {...register('postTitle', { required: true })}
                    disabled={!session} 
                    className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
                    type="text" 
                    placeholder={session ? (space ? `Create a post in ${space}` : "Create a post by entering a title!") : 'Sign in to post'}
                />
                <PhotoIcon onClick={() => setImageBoxOpen(!imageBoxOpen)} className={`h-6 cursor-pointer text-gray-300 ${imageBoxOpen && 'text-blue-300'}`} />
                <LinkIcon className="h-6 text-gray-300"/>
            </div>

            {watch('postTitle') && (
                <div className="flex flex-col py-2">
                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Body:</p>
                        <input 
                            className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                            {...register('postBody')} type="text" placeholder="Text (optional)" />
                    </div>

                    {!space && (
                        <div className="flex items-center px-2"> 
                            <p className="min-w-[90px]">Space:</p>
                            <input
                                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                                {...register('space', { required: true })}
                                type="text"
                                placeholder="i.e. Datasets"
                            />
                        </div>
                    )}

                    {imageBoxOpen && (
                        <div className="flex items-center px-2"> 
                            <p className="min-w-[90px]">Image URL:</p>
                            <input
                                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                                {...register('postImage')}
                                type="text"
                                placeholder="Optional..."
                            />
                        </div>
                    )}

                    {Object.keys(errors).length > 0 && (
                        <div className="space-y-2 p-2 text-red-500">
                            {errors.postTitle?.type === 'required' && (
                                <p>A Post Title is required</p>
                            )}
                            {errors.space?.type === 'required' && (
                                <p>A Space is required</p>
                            )}
                        </div>
                    )}

                    {watch('postTitle') && (
                        <button className="w-full rounded-full bg-blue-400 p-2 text-white">Create Post</button>
                    )}
                </div>
            )}
        </form>
    );
}

export default PostBox;
