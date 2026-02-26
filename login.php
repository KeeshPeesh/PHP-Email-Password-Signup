<?php
// ---------------------------
// Handle login attempt
// ---------------------------
$message = '';
$success = false;
$username = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $message = "Please fill in both fields.";
    } else {
        // Read users.txt
        $users = [];
        if (file_exists('users.txt')) {
            $lines = file('users.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                list($u, $e, $hash) = explode('|', $line, 3);
                $users[trim($u)] = trim($hash);
            }
        }

        if (isset($users[$username]) && password_verify($password, $users[$username])) {
            $success = true;
            $message = "Login successful! Welcome, $username 🎉";
            // In real app: start session, set $_SESSION['user'] = $username, redirect
            // header("Location: dashboard.php"); exit;
        } else {
            $message = "Invalid username or password.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login - Simple</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
  <div class="form-card">
    <h1>Sign In</h1>

    <?php if ($message): ?>
      <div class="alert <?= $success ? 'success' : 'error' ?>">
        <?= htmlspecialchars($message) ?>
      </div>
    <?php endif; ?>

    <form id="loginForm" method="post" novalidate>
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          autocomplete="username"
          value="<?= htmlspecialchars($username) ?>"
          required
          autofocus
        >
        <small class="error-msg"></small>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          autocomplete="current-password"
          required
        >
        <small class="error-msg"></small>
      </div>

      <button type="submit" id="submitBtn">
      <span class="btn-text">Log In</span>
      <span class="btn-spinner hidden"></span>
</button>

      <p class="login-link">
        Don't have an account? <a href="index.php">Sign up</a>
      </p>
    </form>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="gsap.js"></script>
<script src="script.js"></script>
</body>
</html>