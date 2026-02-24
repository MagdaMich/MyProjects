using System.Diagnostics;

namespace Common.Cmd
{
    internal class CmdHelper
    {
        private static readonly List<Process> ProcessList = new List<Process>();

        internal static void StartProcess(string command, string process = "cmd.exe")
        {
            var startInfo = new ProcessStartInfo(process)
            {
                Arguments = command,
                UseShellExecute = false,
            };

            var newProcess = Process.Start(startInfo);
            if (newProcess != null)
            {
                ProcessList.Add(newProcess);
            }

            //ProcessList.Add(Process.Start(startInfo)!);
        }

        internal static void StopProcess()
        {
            foreach (var process in ProcessList.Where(process => process != null))
            {
                process!.CloseMainWindow();
                process.Dispose();
            }
        }
    }
}
