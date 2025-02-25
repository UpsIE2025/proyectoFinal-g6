namespace Auth0.Models
{
    public class Auth0
    {
        public string client_id {  get; set; }
        public string client_secret { get; set; }
        public string audience { get; set; }
        public string grant_type { get; set; }
    }
}
