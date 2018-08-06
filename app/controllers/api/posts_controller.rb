# frozen_string_literal: true

class Api::PostsController < ApiController
  def index
    render json: { posts: Post.all }, status: :ok
  end

  def create
    return head 401 unless current_user&.admin?

    post = Post.new post_params

    if post.save
      render json: { message: 'Post successfully created!', post: post }, status: :ok
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def update
    return head 401 unless current_user&.admin?

    post = Post.find_by id: params[:id]

    if post&.update(post_params)
      render json: { message: 'Post successfully updated!', post: post }, status: :ok
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def destroy
    return head 401 unless current_user&.admin?

    post = Post.find_by id: params[:id]

    if post&.delete
      render json: { message: 'Post successfully deleted!' }, status: :ok
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :subtitle, :text)
  end
end
