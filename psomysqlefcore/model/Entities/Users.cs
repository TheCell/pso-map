namespace psomysqlefcore.model.Entities
{
    public class Users
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int userRights { get; set; }
    }
}
