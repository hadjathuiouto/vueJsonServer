const Post = require('./models/Post.model')
const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World';
        },
        getAllPosts: async () => {
            return await Post.find();

        },
        getPost: async (parent, args, context, info) => {
            return await Post.findById(args.id);
        }
    },
    Mutation: {
        createPost: async (parent, args, context, info) => {
            const { title, description } = args.post;
            const post = new Post({ title, description });
            await post.save();
            return post;
        },
        deletePost: async (parent, args, context, info) => {
            await Post.findByIdAndDelete(args.id)
            return 'The post was successfull deleted';
        },
        updatePost: async (parent, args, context, info) => {
            const update = {};

            if(args.post.title) {
                update.title = args.post.title;
            }
            if(args.post.description) {
                update.description = args.post.description;
            }
            const post = await Post.findByIdAndUpdate(args.id, update, { new: true});
            return post;
        }
    }
};

module.exports = resolvers;