# frozen_string_literal: true

class Api::PostsController < ApiController
  def index
    render json: { posts: Post.all }, status: :ok
  end

  def create
    post = Post.new post_params

    if post.save
      render json: { post: post }, status: :ok
    else
      render json: { error: post.errors }, status: :error
    end
  end

  def destroy
    id = params[:id]
    post = Post.find_by(id: id)

    if post&.delete
      render json: { message: 'Post successfully deleted!' }, status: :ok
    else
      render json: { error: "Post with id: #{id} not found!" }, status: :error
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :subtitle, :text)
  end
end
