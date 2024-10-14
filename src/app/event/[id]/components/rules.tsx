export const Rules = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">Competition Rules</h2>
        <div className="mt-4 grid gap-3">
            <h2 className="text-lg font-large">One account per participant</h2>
            <p className="text-base">
            You cannot sign up to LevelUp from multiple accounts and therefore you cannot submit from multiple accounts.
            </p>
        </div>

        <div className="mt-4 grid gap-3">
            <h2 className="text-lg font-large">No private sharing outside teams</h2>
            <p className="text-base">
            Privately sharing code or data outside of teams is not permitted. Its okay to share code if made available to
              all participants on the forums.
            </p>
        </div>

        <div className="mt-4 grid gap-3">
            <h2 className="text-lg font-large">Team Limits</h2>
            <p className="text-base">
            The maximum team size is 5.
            </p>
        </div>

      </div>
    );
  };