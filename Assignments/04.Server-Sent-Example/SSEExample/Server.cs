using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace SSEExample
{
    public class Server
    {
        public void Run()
        {
            //Opretter en webhost vha. WebHostBuilder og Kestrel-server
            var host = new WebHostBuilder()
                .UseKestrel()
                .ConfigureServices(services =>
                {
                    //Konfigurer tjenester, der skal bruges af applikationen
                    services.AddRouting();
                })
                .Configure(app =>
                {
                    app.UseRouting();

                    app.UseEndpoints(endpoints =>
                    {
                        //Endpoint der håndtere SSE
                        endpoints.MapGet("/events", async context =>
                        {
                            //Sætter parametre for SSE
                            context.Response.Headers.Append("Content-Type", "text/event-stream");
                            context.Response.Headers.Append("Cache-Control", "no-cache");
                            context.Response.Headers.Append("Connection", "keep-alive");

                            //Sender første besked til klienten i realtid
                            var response = "data: " + DateTime.Now.ToLongTimeString() + "\n\n";
                            await context.Response.WriteAsync(response);

                            var delayTask = Task.Delay(1000); //Opretter en opgave, der venter i 1 sekund
                            while (true)
                            {
                                await delayTask;

                                //Ny tid sendes til klienten
                                response = "data: " + DateTime.Now.ToLongTimeString() + "\n\n";
                                await context.Response.WriteAsync(response);

                                //Ny opgave oprettes, der venter i 1 sekund inden næste meddelelse sendes
                                delayTask = Task.Delay(1000);
                            }
                        });
                    });
                })
                .Build();

            host.Run();
        }
    }
}
