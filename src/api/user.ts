import { supabase } from '@/supabase'

const getProfileInfo = async (id: any) => {
  return await supabase
    .from('profiles')
    .select('initials, cellar_id, username, avatar_url')
    .eq('id', id)
    .single()
}
const logout = async () => {
  try {
    let { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  }
}

export { getProfileInfo, logout }
