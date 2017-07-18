defmodule Sling.Web.MessageView do
  use Sling.Web, :view
  alias Sling.Web.MessageView
  alias Sling.Web.UserView

  def render("index.json", %{messages: messages}) do
    %{data: render_many(messages, MessageView, "message.json")}
  end

  def render("show.json", %{message: message}) do
    %{data: render_one(message, MessageView, "message.json")}
  end

  def render("message.json", %{message: message}) do
    %{id: message.id,
      text: message.text,
      inserted_at: message.inserted_at,
      user: render_one(message.user, UserView, "user.json")
    }
  end
end
