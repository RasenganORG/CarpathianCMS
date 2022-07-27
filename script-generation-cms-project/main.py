from project_data import Cms_project
import os
import shutil
import json


# print("Input the name of your project (small letters):")
# mfp_name = input()
#
# print("Input the name of your project: ")
# mfp_exposed_name = input()
#
# print("Input what port would you like to use: ")
# port = input()
#
# print("Input the path of your current project: ")
# project_input_path = input()
#
# print("Input the path of your adapted project: ")
# project_output_path = input()

# cms_project = Cms_project(mfp_name,mfp_exposed_name,port,project_input_path, project_output_path)
cms_project = Cms_project("calendar_generated", "CalendarGeneratedApp", "8082",
                          "D:/Work/React/projects-for-carpathian-mfe/calendar-app-2",
                          "D:/Work/React/carpathian-cms")
template_folder = "D:/Work/React/TemplateFolder"

def copy_folder(source_folder, destination_folder):
    shutil.copytree(source_folder, destination_folder)

def handle_config():
    try:
        if not os.path.exists(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/config/"):
            copy_folder(f"{template_folder}/config/",f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/config/")

        data = ''
        with open(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/config/webpack.dev.js", "r") as file:
            data = file.read()

        with open(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/config/webpack.dev.js", "w") as file:
            data = data.replace("8081", cms_project.port)
            data = data.replace("marketing", cms_project.mfp_name)
            data = data.replace("MarketingApp", cms_project.mfp_exposed_name)
            file.write(data)

        data = ''
        with open(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/config/webpack.prod.js", "r") as file:
            data = file.read()

        with open(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/config/webpack.prod.js", "w") as file:
            data = data.replace("marketing", cms_project.mfp_name)
            data = data.replace("MarketingApp", cms_project.mfp_exposed_name)
            file.write(data)
    except:
        print("Error while creating the config-webpack files")


def handle_public():
    try:
        if not os.path.exists(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/public/"):
            copy_folder(f"{template_folder}/public/",f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/public/")

        data = ''
        with open(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/public/index.html", "r") as file:
            data = file.read()

        with open(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/public/index.html", "w") as file:
            data = data.replace("_marketing-dev-root", f"_{cms_project.mfp_name}_public_id")
            data = data.replace("Marketing", cms_project.mfp_name)
            file.write(data)
    except:
        print("Error while creating the public folder")

def handle_src():
    try:
        if not os.path.exists(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/src/"):
            copy_folder(f"{template_folder}/src/",f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/src/")

        data = ''
        with open(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/src/bootstrap.js", "r") as file:
            data = file.read()

        with open(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/src/bootstrap.js", "w") as file:
            data = data.replace("_marketing-dev-root", f"_{cms_project.mfp_name}_public_id")
            file.write(data)

        #copy contents of the components from root project to mutated project
        copy_folder(f"{cms_project.project_input_path}/src/components", f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/src/components")
        shutil.copyfile(f"{cms_project.project_input_path}/src/App.js", f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/src/App.js")
    except:
        print("")

def handle_package():
    try:
        if not os.path.exists(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/package.json"):
            shutil.copy(f"{cms_project.project_input_path}/package.json",
                        f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/package.json" )

        data = {}
        with open(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/package.json", "r") as file:
            data = json.load(file)

        with open(f"{cms_project.project_output_path}/packages/{cms_project.mfp_name}/package.json", "w") as file:
            with open(f"{template_folder}/package.json", "r") as fileTemplate:
                dataTemplate = json.load(fileTemplate)
                #update name
                data["name"] = cms_project.mfp_name

                #replace scripts
                data.pop("scripts")
                data["scripts"] = dataTemplate["scripts"]

                #add dev-dependencies
                if data.get("devDependencies"):
                    #if there is already a key like this
                    devDep = data["devDependencies"]
                    for dependency in dataTemplate["devDependencies"]:
                        devDep[dependency] = dataTemplate["devDependencies"][dependency]
                    data["devDependencies"] = devDep

                else:
                    #if there isn't a key'
                    data["devDependencies"] = dataTemplate["devDependencies"]

                json1 = json.dumps(data, indent=2)
                print(dataTemplate)
                file.write(json1)
    except:
        print("Error while creating the package.json file")

def handle_git_actions():
    try:
        #creating the folder
        if os.path.exists(f"{cms_project.project_output_path}/.github") == False:
            os.mkdir(f"{cms_project.project_output_path}/.github")
            os.mkdir(f"{cms_project.project_output_path}/.github/workflows")

        #copying the contents of the template file
        with open(f"{template_folder}/deploy-marketing", "r") as templateFile, open(f"{cms_project.project_output_path}/.github/workflows/deploy-{cms_project.mfp_name}.yml","w") as targetFile:
            for line in templateFile:
                new_line = line.replace("marketing", cms_project.mfp_name)
                targetFile.write(new_line)
    except:
        print("Error while creating git actions")

def handle_modify_container_config_remotes():
    try:
        #handle webpack.dev
        with open(f"{cms_project.project_output_path}/packages/container/config/webpack.dev.js", "r") as file:
            data = file.read()

        remotes_start = data.find("remotes")
        output_data = ""
        for i in range(remotes_start,len(data)):
            if data[i] == "{":
                if data[i+1] == "}":
                    indent_correctly = "\n      "
                else:
                    indent_correctly = ""

                # creating a new string with the new line
                output_data = data[:i+1] +"\n" +f"        {cms_project.mfp_name}:'{cms_project.mfp_name}@http://localhost:{cms_project.port}/remoteEntry.js'," +indent_correctly+ data[i+1:]
                break
        print(output_data)

        with open(f"{cms_project.project_output_path}/packages/container/config/webpack.dev.js", "w") as file:
            file.write(output_data)

        #handle webpack.prod
        with open(f"{cms_project.project_output_path}/packages/container/config/webpack.prod.js", "r") as file:
            data = file.read()

        remotes_start = data.find("remotes")
        output_data = ""
        for i in range(remotes_start,len(data)):
            if data[i] == "{":
                if data[i+1] == "}":
                    indent_correctly = "\n      "
                else:
                    indent_correctly = ""

                #creating a new string with the new line
                output_data = data[:i+1] +"\n" +f"        {cms_project.mfp_name}:`{cms_project.mfp_name}"+"@${domain}"+f"/{cms_project.mfp_name}/latest/remoteEntry.js`," +indent_correctly+ data[i+1:]
                break

        with open(f"{cms_project.project_output_path}/packages/container/config/webpack.prod.js", "w") as file:
            file.write(output_data)
    except:
        print("Error while modifying the container remotes property")

def handle_app_in_container_components():
    with open(f"{cms_project.project_output_path}/packages/container/src/components/{cms_project.mfp_exposed_name}.js", "w") as targetFile, open(f"{template_folder}/MarketingApp.js", "r") as templateFile:

        for line in templateFile:
            data = line.replace("marketing", cms_project.mfp_name)
            data = data.replace("MarketingApp", cms_project.mfp_exposed_name)
            targetFile.write(data)




handle_config()
handle_public()
handle_src()
handle_package()
handle_git_actions()
handle_modify_container_config_remotes()
handle_app_in_container_components()






