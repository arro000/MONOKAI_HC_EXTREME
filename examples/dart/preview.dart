import 'dart:async';

/// A generic result with a [value] and an inline `label`.
class Result<T> {
  final T value;
  const Result(this.value);
}

enum Status { idle, ready }

mixin Described {
  String get description;
}

extension PrettyStatus on Status {
  String get label => name.toUpperCase();
}

typedef Formatter = String Function(String value);

class Service with Described {
  static const maxRetries = 3;
  final String name;
  Status status = Status.idle;

  Service({required this.name});

  @override
  String get description => '$name: ${status.label}';

  Future<Result<String>> load(String prefix, {int retries = maxRetries}) async {
    await Future<void>.delayed(const Duration(milliseconds: 1));
    final message = '$prefix $name\nRetries: $retries';
    return Result(message);
  }
}

Future<void> main() async {
  final service = Service(name: 'Monokai');
  final result = await service.load('Hello', retries: 2);
  final (label, count) = ('Preview', 3);
  final raw = r'No interpolation: $label\n';
  final text = '''$label
${result.value}''';
  print('$text ($count)');
  print(raw);
  print(Status.ready.label);
}
