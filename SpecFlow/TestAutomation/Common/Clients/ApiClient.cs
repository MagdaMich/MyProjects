using RestSharp;

namespace Common.Clients
{
    public class ApiClient
    {
        private static readonly string? Url = Configuration.ConfigurationReader.GetConfiguration()?.Api?.WebApi;

        public async Task<RestResponse> Get(string resource)
        {
            return await SendRequest(resource, Method.Get);
        }

        public async Task<RestResponse> Post(string resource, string json)
        {
            return await SendRequestWithJson(resource, Method.Post, json);
        }

        public async Task<RestResponse> Put(string resource)
        {
            return await SendRequest(resource, Method.Put);
        }

        public async Task<RestResponse> Patch(string resource)
        {
            return await SendRequest(resource, Method.Patch);
        }

        public async Task<RestResponse> Delete(string resource)
        {
            return await SendRequest(resource, Method.Delete);
        }

        private static async Task<RestResponse> SendRequest(string resource, Method method)
        {
            var restClient = new RestClient(Url!);

            var request = new RestRequest
            {
                Resource = resource,
                Method = method,
                RequestFormat = DataFormat.Json,
            };

            //request.AddHeader("ContentType", "application/json");
            return await restClient.ExecuteAsync(request);
        }

        private static async Task<RestResponse> SendRequestWithJson(string resource, Method method, string json)
        {
            var restClient = new RestClient(Url!);

            var request = new RestRequest
            {
                Resource = resource,
                Method = method,
                RequestFormat = DataFormat.Json,
            };

            request.AddHeader("ContentType", "application/json");
            request.AddJsonBody(json);

            return await restClient.ExecuteAsync(request);
        }
    }
}
