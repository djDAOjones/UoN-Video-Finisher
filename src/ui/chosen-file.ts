/**
 * Whether the chooser closing without a `change` was a file picked again
 * (VH-238, analyst C's C-01 and C-02).
 *
 * Chrome compares a pick with the input's list by path. The same path picked
 * again fires `cancel`, not `change`, and the list is given new `File`
 * objects all the same; a chooser closed with nothing picked fires `cancel`
 * too, and leaves the list as it was. So the list's file not being the one
 * the page holds is the only sign that a file was picked, and the page reads
 * it as it reads any choice: a file that failed to read, or was copied again
 * to the same place, can be tried again.
 *
 * Pure, so the rule is tested in Node; the event is a real browser's.
 *
 * @param listed - The first file in the input's list when `cancel` fired.
 * @param held - The file the page took up at the last choice, or `null`.
 * @param shut - Whether the picker is disabled: a job or a save is running,
 *   or start-up has not settled. No choice is taken up then, as none can be
 *   made through the picker.
 */
export function pickedAgain(listed: File | undefined, held: File | null, shut: boolean): boolean {
  return !shut && listed !== undefined && listed !== held
}
