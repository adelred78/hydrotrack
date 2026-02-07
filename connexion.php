<?php
include('bdd.php');
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = mysqli_real_escape_string($conn, $_POST['username']);
    $pass = $_POST['password'];

    $result = mysqli_query($conn, "SELECT * FROM utilisateurs WHERE nom_utilisateur='$user'");
    $row = mysqli_fetch_assoc($result);

    if ($row && password_verify($pass, $row['mot_de_passe'])) {
        $_SESSION['user'] = $row['nom_utilisateur'];
        header("Location: ../code html/dashboard.php"); 
    } else {
        $error = "Identifiants incorrects.";
    }
}
?>

<?php
include('header.php');
?>
<body class="auth-page">
    <div class="login-container">
        <form method="post" class="login-form">
            <h2>Connexion <span class="brand">HydroTrack</span></h2>
            
            <?php if(isset($error)) echo "<p style='color:red;'>$error</p>"; ?>

            <input type="text" name="username" placeholder="Nom d'utilisateur" required>
            <input type="password" name="password" placeholder="Mot de passe" required>
            
            <button type="submit" class="btn-primary">Se connecter</button>
            
            <div class="auth-footer">
                <p>Pas encore de compte ?</p>
                <a href="inscription.php" class="btn-secondary-link">Créer un compte agriculteur</a>
            </div>
        </form>
    </div>
</body>
</html>