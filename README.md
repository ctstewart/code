# How to set up Performance Test?

1. Install Google Cloud SDK: Go to the Google Cloud SDK installation page (https://cloud.google.com/sdk/docs/install) and download the appropriate version for your operating system. After the download is complete, run the installation wizard and follow the instructions.
2. Create a GCP project: Go to the GCP Console (https://console.cloud.google.com/) and create a new project. Note down the project ID, as you will need it later.
3. Enable the GKE API: In the GCP Console, navigate to the APIs & Services section and enable the Kubernetes Engine API.
4. Set up authentication: In the Google Cloud SDK Shell, run the command "gcloud auth login" and follow the authentication prompts.
5. Create a GKE cluster: In the Google Cloud SDK Shell, run the command "gcloud container clusters create [CLUSTER-NAME] --zone [ZONE] --num-nodes [NUM-NODES]" to create a new GKE cluster. Replace [CLUSTER-NAME] with the desired name of your cluster, [ZONE] with the desired zone (e.g., us-central1-a), and [NUM-NODES] with the desired number of nodes in the cluster.
6. Connect to the GKE cluster: In the Google Cloud SDK Shell, run the command "gcloud container clusters get-credentials [CLUSTER-NAME] --zone [ZONE]" to connect to the GKE cluster you just created.

# Now that we have set up the GKE cluster with nodes, lets look at commands to run them.

1. **gcloud cheat-sheet:** Display the cheat-sheet for commonly used GCP commands.
2. **kubectl edit deployment my-deployment:** Open the specified deployment in the default text editor to make edits.
3. **kubectl get deployments:** List all the deployments in the current namespace.
4. **kubectl delete deployments my-deployment:** Delete the specified deployment named "my-deployment".
5. **kubectl config view:** Show the current kubectl configuration file settings.
6. **kubectl apply -f manifest.yaml:** Create or update Kubernetes objects described in the manifest file "manifest.yaml".
7. **gcloud container clusters get-credentials cluster-1 --zone=us-central1:** Fetch the credentials for a specific cluster named "cluster-1" in the "us-central1" zone and merge them into the local kubectl configuration file.
8. **gcloud container clusters list:** List all the GKE clusters in the current GCP project.
9. **kubectl create job loadtest --dry-run -o yaml --image=bob:** Create a job configuration named "loadtest" using the Docker image "bob" and output the resulting YAML file without actually creating the job.
10. **kubectl delete -f manifest.yaml && kubectl apply -f manifest.yaml && kubectl get jobs.batch,pods:** Delete and re-apply the Kubernetes objects described in the manifest file "manifest.yaml", and show the status of any jobs and pods created by the manifest.
11. **kubectl get pods -w:** Watch the status of all pods in the current namespace and display updates in real-time.
