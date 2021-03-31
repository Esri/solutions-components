using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace nlsJStoJSON
{
  class nlsJStoJSON
  {
    static void Main(string[] args)
    {
      if (args.Length == 0)
      {
        Console.WriteLine("nlsJStoJSON <javascript file> [<output directory>]");
        return;
      }

      // Get files
      string javascriptFilename = args[0];

      string outputDir = args.Length == 2 ? args[1] : ".";
      if (!outputDir.EndsWith(@"\"))
      {
        outputDir += @"\";
      }
      string jsonFilename = javascriptFilename.Replace(".js", ".json");
      int i = jsonFilename.LastIndexOf(@"\");
      if (i >= 0)
      {
        jsonFilename = jsonFilename.Substring(i + 1);
      }
      jsonFilename = outputDir + jsonFilename;
      Console.WriteLine("Converting {0} into {1}", javascriptFilename, jsonFilename);

      // Start copying
      using (StreamReader sr = new StreamReader(javascriptFilename))
      {
        // Read up to "root:"
        string line = sr.ReadLine();
        while(line != null && !line.Contains("root:"))
        {
          line = sr.ReadLine();
        }
        if (line == null) return;

        i = line.IndexOf("root:");
        int j = line.IndexOf("(", i) + 1;
        line = new String(' ', i) + line.Substring(j);

        using (StreamWriter sw = new StreamWriter(jsonFilename))
        {
          sw.WriteLine(line);

          while (line != null)
          {
            line = sr.ReadLine();

            // Strip comments
            i = line.IndexOf("//");
            if (i >= 0)
            {
              line = line.Substring(0, i);
            }

            // Are we at end of structure?
            if (line.Contains("}),"))
            {
              i = line.IndexOf("}),") + 1;
              sw.WriteLine(line.Substring(0, i));
              return;
            }
            else
            {
              sw.WriteLine(line);
            }
          }
        }
      }
    }
  }
}
