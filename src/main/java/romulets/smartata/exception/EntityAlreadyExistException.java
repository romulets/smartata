package romulets.smartata.exception;

public class EntityAlreadyExistException extends SmartataException {
	
	private static final long serialVersionUID = 107228241202951287L;
	
	public EntityAlreadyExistException(String className, Object key) {
		super(String.format("Entity %s already exists (key: %s)", className, key.toString()));
	}

}
