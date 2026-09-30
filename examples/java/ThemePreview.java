import java.util.List;
import java.util.function.Function;

/**
 * A small Java 17+ highlighting fixture.
 * @param <T> the value type
 * @see java.util.List
 */
public class ThemePreview<T> {
    private static final int LIMIT = 3;
    private final T value;

    public ThemePreview(T value) {
        this.value = value;
    }

    public record User(String name, int age) {}

    public enum Status { IDLE, READY }

    @interface Label {
        String value();
    }

    @Label(value = "preview")
    public String describe(Function<T, String> formatter) {
        return formatter.apply(value);
    }

    /** @return the stored value */
    public T getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Value: " + value;
    }

    public static void main(String[] args) {
        var users = List.of(new User("Ada", 36), new User("Grace", 40));
        users.stream()
            .filter(user -> user.age() >= LIMIT)
            .map(User::name)
            .forEach(System.out::println);

        String text = """
            Monokai preview
            Java records and text blocks
            """;
        Status status = Status.READY;
        String label = switch (status) {
            case IDLE -> "idle";
            case READY -> "ready";
        };
        System.out.println(text + label + "\n");
    }
}
