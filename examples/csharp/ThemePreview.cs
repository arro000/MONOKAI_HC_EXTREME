using System;
using System.Collections.Generic;
using System.Threading.Tasks;

#nullable enable

namespace ThemePreview;

public enum UserRole { Reader, Editor, Admin }

public interface IRepository<T> where T : class
{
    Task<T?> FindAsync(int id);
}

public readonly record struct UserId(int Value);
public sealed record User(UserId Id, string Name, UserRole Role);
public delegate void UserChangedHandler(User user);

/// <summary>Loads a <see cref="User"/> and raises an event.</summary>
/// <param name="repository">The user repository.</param>
public sealed class UserService(IRepository<User> repository)
{
    public const int MaxUsers = 100;
    private readonly IRepository<User> _repository = repository;
    public event UserChangedHandler? UserChanged;
    public string Title { get; private set; } = "Users";

    public async Task<string> LoadAsync(int id)
    {
        var user = await _repository.FindAsync(id);
        if (user is null) return "Unknown\nuser";

        Title = $"{user.Name}: {user.Role}";
        UserChanged?.Invoke(user);
        var path = @"C:\Users\Public";
        var json = $$"""
            { "name": "{{user.Name}}", "path": "{{path}}" }
            """;
        return json;
    }

    [Obsolete("Use LoadAsync instead")]
    public string Load(int id) => $"User {id}";
}

public static class UserExtensions
{
    public static bool IsAdmin(this User user) => user.Role == UserRole.Admin;
}
