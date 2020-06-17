# Pharmacom

This is a digital prescription system in which doctor can prescribe medicines digitally. Each prescription will have an unique prescription Id, pharmasist uses this Id to view the prescription.<br/>

Doctors and Pharmasists can register through 'Register' option.  Freshly registered accounts will be activated only after the approval of administrator.
Doctors can prescribe medicines by logging into their account. Pharmasists can view prescriptions by entering into their accounts.
Administrator have the privilege to verify, view and remove Doctors and Pharmasists.


### Configuring Backend
1. Log in to [mongoDb](https://account.mongodb.com/account/login) account

2. Create a `New Project` named `Pharmacon`<br/>
    ![Create Poject](/images/newproject.png)<br/>
    Create Project<br/>
    ![Create Poject](/images/createproject.png)<br/>

3. Create a cluster<br/>
    ![Create Cluster](/images/createcluster.png)<br/>
    Select Shared Cluster<br/>
    ![Create Cluster](/images/createcluster2.png)<br/>
    Select GCP and lowa<br/>
    ![Create Cluster](/images/createcluster3.png)<br/>
    

4. Add Admin Details<br/>
    Click on Collection<br/>
    ![Create collection](/images/createcluster4.png)<br/>
    Click on `Add My Own Data`<br/>
    ![Add Data](/images/adddata.png)<br/>
    Create Database<br/>
    ![Create Db](/images/createdb.png)<br/>
    Click on Insert Document<br/>
    ![Insert Document](/images/insertdoc.png)</br>
    Insert `Admin` details<br/>
    ![Add Admin](/images/addadmin.png)<br/>
    ``` 
    {
        "_id": {
            "$oid": "5ee885d95de65397132b9ae2"
        },
        "first_name": "Administrator",
        "last_name": "Administrator",
        "email": "admin@xyz.com",
        "password": "$2b$10$RpQUe1.GoaBuu8zsRrmbhuIfwJ0pb8A.UDk7ctPn/t061cY.lRhOG",
        "role": "admin",
        "acc_status": "true"
    } 
    ```

5. Allow Network Access by whitelisting IP<br/>
    ![Network Access](/images/networkaccess.png)<br/>
    You can either whitelist `Current IP` or `All IP` <br/>
    ![Network Access](/images/networkaccess2.png)<br/>

6. Connecting to application<br/>
    Select `connect`<br/>
    ![Connection 1](/images/conn.png)<br/>
    Create DB User<br/>
    ![Connection 2](/images/conn2.png)<br/>
    Choose connection method as `Connect Your Application`<br/>
    ![Connection 3](/images/conn3.png)<br/>
    Copy the URI<br/>
    ![Connection 4](/images/conn4.png)<br/>
    Create a `.env` file in `backend` folder and set the content as `ATLAS_URI=`<paste the URI copied > . Change the `dbName` and `password` with your's.><br/>
    ![Connection 5](/images/conn5.png)<br/>

    ## Run Application

    1. Clone repository using `git clone https://github/printfjoby/Pharmacon`

    2. To install depndencies, run `npm install` in the root(/) directory and also in backend directory

    3. Start Backend server in port:5000,
        run `npm start` in backend directory

    4. Start Frontend server in port:3000,
        run `npm start` in root directory
    
    5. The Application will start running in `localhost:3000`

    ## Interacting with Application
    1. Open the application and create a Doctor and Pharmasist account using `Register` option.
    
    2. Login as administrator using email `admin@xyz.com` and password `admin123`.
    
    3. Click on `Approve` and approve the doctor and pharmasist.

    4. Login as `Doctor` using the account you created.

    5. Using `Prescribe` option prescribe medicine and copy the `Prescription Id` from the response message.
    
    6. Login as `Pharmasist` 
    
    7. In `View Prescription` option paste the 'Prescription ID` and view the prescription.
        

    ## Application Screenshots

    ### Login Page
    ![Login](/images/login.png)

    ### Register Page
    ![Register](/images/register.png)

    ### Approve or Reject Doctors and Pharmasist
    ![approve](/images/approve.png)

    ### View All Doctors
    ![View Doctor](/images/viewdoc.png)

    ### View All Pharmasists
    ![View Pharmasist](/images/viewpharma.png)

    ### Prescribe Medicine
    ![Prescribe](/images/prescribe.png)

    ### View Prescription
    ![View Prescription](/images/viewprescription.png)