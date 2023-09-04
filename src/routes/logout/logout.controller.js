
exports.logout = function(req, res) {
    // Destroy the session and remove the token
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Error logging out');
      }
      res.status(200).send('Logged out successfully!');
    });
}
