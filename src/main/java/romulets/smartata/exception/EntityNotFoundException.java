package romulets.smartata.exception;

public class EntityNotFoundException extends SmartataException{

	private static final long serialVersionUID = 697684377682555755L;

	public EntityNotFoundException(String className, Object key) {
		super(String.format("Entity %s not found (key: %s)", className, key.toString()));
	}
	
}
