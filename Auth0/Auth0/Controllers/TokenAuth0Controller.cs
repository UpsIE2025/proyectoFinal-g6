using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;

namespace Auth0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenAuth0Controller : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TokenAuth0Controller(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpPost]
        [AllowAnonymous]
        public IActionResult ValidateToken([FromBody] string token)
        {
           
            if (string.IsNullOrEmpty(token)) {
                return BadRequest(new { issuccess = false , message = "Token no proporcionado" });
            }
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

                if (jsonToken == null)
                {
                    return Unauthorized(new { issuccess = false, message = "Token inválido" });
                }

                var expiration = jsonToken.ValidTo;
                if (expiration < DateTime.UtcNow)
                {
                    return Unauthorized(new { issuccess = false, message = "Token expirado" });
                }

                return Ok(new { issuccess = true, message = "Token válido" });

            }
            catch (Exception ex)
            {
                return Unauthorized(new { issuccess = false, message = "Token inválido" });
            }
        }
    }
}
