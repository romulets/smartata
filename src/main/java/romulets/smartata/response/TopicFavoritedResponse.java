package romulets.smartata.response;

public class TopicFavoritedResponse {

	private boolean isFavorite;

	public TopicFavoritedResponse(boolean isFavorite) {
		setFavorite(isFavorite);
	}
	
	public TopicFavoritedResponse() {
		this(false);
	}
	
	public boolean isFavorite() {
		return isFavorite;
	}

	public void setFavorite(boolean isFavorite) {
		this.isFavorite = isFavorite;
	}
	
}
